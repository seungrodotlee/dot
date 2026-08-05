import * as fs from "fs/promises";
import { AstBuilder, GherkinClassicTokenMatcher, Parser } from "@cucumber/gherkin";
import * as Cucumber from "@cucumber/messages";
import { brand, Brand } from "@repo/brand";
import { errorCase, ErrorCase, result, Result } from "@repo/result";
import { isNil, isNotNil } from "@repo/utils";

type RawFeatureString = Brand<string, "RawFeatureString">;
const RawFeatureString = brand<RawFeatureString>();

type ValidFeatureChild = Cucumber.FeatureChild & {
  rule?: Cucumber.Rule & {
    children: Cucumber.RuleChild & {
      scenario: Cucumber.Scenario;
    };
  };
};

type RawValidFeature = Brand<
  Cucumber.Feature & {
    children: ValidFeatureChild;
  },
  "RawFeature"
>;
const RawValidFeature = brand<RawValidFeature>();

namespace Names {
  export type Feature = Brand<string, "Names.Feature">;
  export const Feature = brand<Names.Feature>();
  export type Rule = Brand<string, "Names.Rule">;
  export const Rule = brand<Names.Rule>();
  export type Step = Brand<string, "Names.Step">;
  export const Step = brand<Names.Step>();
}

namespace Valid {
  export type Scenario = Omit<Cucumber.Scenario, "examples"> & {
    examples: Array<
      Cucumber.Examples & {
        tableHeader: Cucumber.TableRow;
      }
    >;
  };
  export type Rule = Omit<Cucumber.Rule, "children"> & {
    children: Array<
      Cucumber.RuleChild & {
        scenario: Scenario;
      }
    >;
  };

  type FeatureChild = Cucumber.FeatureChild & {
    scenario?: Scenario;
    rule?: Rule;
  };

  export type RawFeature = Brand<
    Omit<Cucumber.Feature, "children"> & {
      children: FeatureChild[];
    },
    "RawFeature"
  >;
  export const RawFeature = brand<RawFeature>();
}

namespace Sanitized {
  export type Feature = {
    name: Names.Feature;
    globalBackground?: Sanitized.Background;
    children: Array<{
      rule?: Sanitized.Rule;
      background?: Sanitized.Background;
      scenario?: Sanitized.Scenario;
    }>;
  };

  export type Rule = {
    name: Names.Rule;
    children?: Array<{
      background?: Sanitized.Background;
      scenario: Sanitized.Scenario;
    }>;
  };

  export type Background = {
    steps: PartitionedStep;
  };

  export type Scenario = {
    name: string;
    steps: PartitionedStep;
  };

  export type PartitionedStep = {
    Given?: Record<Names.Step, Omit<Sanitized.Step, "type" | "text">>;
    When?: Record<Names.Step, Omit<Sanitized.Step, "type" | "text">>;
    Then?: Record<Names.Step, Omit<Sanitized.Step, "type" | "text">>;
  };

  export type Step = {
    type: string;
    text: string;
    attachedText?: string;
    table?: Record<string, string>[];
  };
}

type IFeatureParser = {
  parseRawFeature(
    rawFeatureString: RawFeatureString,
  ): Result<
    Valid.RawFeature,
    [
      ErrorCase<"EmptyFeature">,
      ErrorCase<"RuleWithoutScenario", { ruleName: Names.Rule }>,
      ErrorCase<"AndStepWithoutPreStep", { stepText: string }>,
      ErrorCase<"TableWithoutHead", { bodies: string[][] }>,
      ErrorCase<"TableWithoutBodies", { header: string[] }>,
    ]
  >;
  sanitizeFeature(rawFeature: Valid.RawFeature): Result<Sanitized.Feature, []>;
};

class FeatureParser implements IFeatureParser {
  parseRawFeature(rawFeatureString: RawFeatureString) {
    const uuidFn = Cucumber.IdGenerator.uuid();
    const builder = new AstBuilder(uuidFn);
    const matcher = new GherkinClassicTokenMatcher();

    const parser = new Parser(builder, matcher);
    const { feature: rawFeature } = parser.parse(rawFeatureString);

    if (isNil(rawFeature)) {
      return result.fail(errorCase("EmptyFeature"));
    }

    const featureValidationResult = validateFeature(rawFeature);
    if (!featureValidationResult.ok) return featureValidationResult;

    return result.ok(featureValidationResult.value);
  }

  sanitizeFeature(rawFeature: Valid.RawFeature) {
    const globalBackground = sanitizeBackground(
      rawFeature.children.find(isGlobalBackground)?.background,
    );

    const children = rawFeature.children
      .filter((child) => !isGlobalBackground(child))
      .map((featureChild) => ({
        background: sanitizeBackground(featureChild.background),
        rule: sanitizeRule(featureChild.rule),
        scenario: sanitizeScenario(featureChild.scenario),
      }));

    return result.ok({
      name: Names.Feature(rawFeature.name),
      globalBackground,
      children,
    });
  }
}

function validateFeature(feature: Cucumber.Feature) {
  for (const child of feature.children) {
    if (isNotNil(child.rule)) {
      const ruleValidationResult = validateRule(child.rule);
      if (!ruleValidationResult.ok) return ruleValidationResult;
    }

    if (isNotNil(child.background)) {
      const backgroundValidationResult = validateBackground(child.background);
      if (!backgroundValidationResult.ok) return backgroundValidationResult;
    }

    if (isNotNil(child.scenario)) {
      const scenarioValidationResult = validateScenario(child.scenario);
      if (!scenarioValidationResult.ok) return scenarioValidationResult;
    }
  }

  return result.ok(Valid.RawFeature(feature as Valid.RawFeature));
}

function validateRule(rule: Cucumber.Rule) {
  if (rule.children.length === 0 || rule.children.some(isNil)) {
    return result.fail(errorCase("RuleWithoutScenario", { ruleName: Names.Rule(rule.name) }));
  }

  return result.ok(rule);
}

function validateBackground(background: Cucumber.Background) {
  const stepsValidationResult = validateSteps(background.steps);
  if (!stepsValidationResult.ok) return stepsValidationResult;

  return result.ok(background);
}

function validateScenario(scenario: Cucumber.Scenario) {
  const examplesValidationResult = validateExamples(scenario.examples);
  if (!examplesValidationResult.ok) return examplesValidationResult;

  const stepsValidationResult = validateSteps(scenario.steps);
  if (!stepsValidationResult.ok) return stepsValidationResult;

  return result.ok(scenario);
}

function validateSteps(steps: readonly Cucumber.Step[]) {
  if (steps[0]?.keyword.trim() === "And") {
    return result.fail(errorCase("AndStepWithoutPreStep", { stepText: steps[0].text }));
  }

  const tableWithoutBodies = steps.find(
    (step) => isNotNil(step.dataTable) && step.dataTable.rows.length === 1,
  )?.dataTable;

  if (isNotNil(tableWithoutBodies)) {
    return result.fail(
      errorCase("TableWithoutBodies", {
        header: tableWithoutBodies.rows[0].cells.map((cell) => cell.value),
      }),
    );
  }

  return result.ok(steps);
}

function validateExamples(examples: readonly Cucumber.Examples[]) {
  const tableBodyWithoutHeader = examples.find((example) => isNil(example.tableHeader))?.tableBody;
  if (isNotNil(tableBodyWithoutHeader)) {
    return result.fail(
      errorCase("TableWithoutHead", {
        bodies: tableBodyWithoutHeader.map((row) => row.cells.map((cell) => cell.value)),
      }),
    );
  }

  return result.ok(examples);
}

function run() {
  const featureParser = new FeatureParser();
  const rawFeature = featureParser.parseRawFeature(RawFeatureString(feature));

  if (!rawFeature.ok) {
    console.error(rawFeature.error);
    return;
  }

  const sanitized = featureParser.sanitizeFeature(rawFeature.value);

  fs.writeFile("feature.raw.json", JSON.stringify(rawFeature.value));
  fs.writeFile("feature.json", JSON.stringify(sanitized.value));
}

function sanitizeRule(rule: Valid.Rule | undefined): Sanitized.Rule | undefined {
  if (rule == null) return undefined;

  return {
    name: Names.Rule(rule.name),
    children: rule.children.map((ruleChild) => ({
      background: sanitizeBackground(ruleChild.background),
      scenario: sanitizeScenario(ruleChild.scenario),
    })),
  };
}

function isGlobalBackground(child: Cucumber.FeatureChild) {
  const keys = Object.keys(child);

  return keys.length === 1 && keys[0] === "background";
}

function sanitizeBackground(background?: Cucumber.Background): Sanitized.Background | undefined {
  if (background == null) return undefined;

  return {
    steps: partitionStepsWithSanitize(background.steps),
  };
}

function sanitizeScenario<
  T extends Valid.Scenario | undefined,
  R = T extends undefined ? Sanitized.Scenario | undefined : Sanitized.Scenario,
>(scenario: T): R {
  if (isNil(scenario)) return undefined as R;

  const examples = scenario.examples.flatMap((example) =>
    buildTable(example.tableHeader, example.tableBody),
  );

  return {
    name: scenario.name,
    steps: partitionStepsWithSanitize(scenario.steps, examples),
  } as R;
}

function partitionStepsWithSanitize(
  steps: readonly Cucumber.Step[],
  examples?: Array<Record<string, string>>,
): Sanitized.PartitionedStep {
  const Given: Record<string, Omit<Sanitized.Step, "type" | "text">> = {};
  const When: Record<string, Omit<Sanitized.Step, "type" | "text">> = {};
  const Then: Record<string, Omit<Sanitized.Step, "type" | "text">> = {};

  sanitizeSteps(steps, examples).forEach((sanitizedStep) => {
    const { type, text, ...stepValues } = sanitizedStep;

    if (type === "Given") Given[text] = stepValues;
    if (type === "When") When[text] = stepValues;
    if (type === "Then") Then[text] = stepValues;
  });

  return {
    Given: objectSize(Given) > 0 ? Given : undefined,
    When: objectSize(When) > 0 ? Given : undefined,
    Then: objectSize(Then) > 0 ? Given : undefined,
  };
}

function objectSize(object: Record<string, unknown>) {
  return Object.keys(object).length;
}

function sanitizeSteps(steps: readonly Cucumber.Step[], examples?: Array<Record<string, string>>) {
  if (examples != null && examples.length > 0) {
    return examples.flatMap((example) => {
      const ctx = { lastKeyword: "", example };

      const result = steps.map(sanitizeStep(ctx));

      return result;
    });
  }

  const ctx = { lastKeyword: "" };

  const result = steps.map(sanitizeStep(ctx));

  return result;
}

const sanitizeStep =
  (ctx: { lastKeyword: string; example?: Record<string, string> }) => (step: Cucumber.Step) => {
    const { lastKeyword, example } = ctx;

    const rawKeyword = step.keyword.trim();

    const keyword = rawKeyword === "And" ? lastKeyword : rawKeyword;
    ctx.lastKeyword = keyword;

    let text = step.text;

    const matches = text.match(/"<[^"]+>"|<[^>]+>|"(?!<[^"]+>)[^"]+"|-?(?:\d+\.\d+|\.\d+)|-?\d+/g);

    const props: Array<number | string> = [];

    matches?.forEach((match) => {
      const strMatch = /"([^"<]+)"/.exec(match);

      if (strMatch != null) {
        const value = strMatch[1];
        props.push(value);
        text = text.replace(match, "{string}");
        return;
      }

      const intMatch = /(?<![\w.])-?\d+(?![\w.])/.exec(match);

      if (intMatch != null) {
        const value = intMatch[1];
        props.push(Number(value));
        text = text.replace(match, "{int}");
        return;
      }

      const floatMatch = /(?<![\w.])-?(?:\d+.\d+)/.exec(match);

      if (floatMatch != null) {
        const value = floatMatch[1];
        props.push(Number(value));
        text = text.replace(match, "{float}");
        return;
      }

      if (example == null) return;

      const strExampleMatch = /(?<=")<([^>]+)>(?=")/.exec(match);

      if (strExampleMatch != null) {
        const value = strExampleMatch[1];
        props.push(example[value]);
        text = text.replace(match, "{string}");
        return;
      }

      const numExampleMatch = /(?<!")<([^>]+)>(?!")/.exec(match);

      if (numExampleMatch != null) {
        const value = numExampleMatch[1];
        props.push(Number(example[value]));
        text = text.replace(
          match,
          Number(example[value]) === parseInt(example[value]) ? "{int}" : "{float}",
        );
        return;
      }
    });

    return {
      type: keyword,
      text,
      props: props.length > 0 ? props : undefined,
      attachedText: applyExample(step.docString?.content, example),
      table: (() => {
        const rows = step.dataTable?.rows;

        if (rows == null) return undefined;

        const [rawKeys, ...rawValues] = rows;

        return buildTable(rawKeys, rawValues, example);
      })(),
    };
  };

function applyExample<T extends string | undefined>(
  origin: T,
  example?: Record<string, string>,
): T {
  if (origin == null) return undefined as T;
  if (example == null || !["<", ">"].every((arrowBracket) => origin.includes(arrowBracket)))
    return origin;

  let result: string = origin;
  Object.entries(example).forEach(
    ([key, value]) => (result = result.replaceAll(`<${key}>`, value)),
  );

  return result as T;
}

function buildTable(
  header: Cucumber.TableRow,
  bodies: readonly Cucumber.TableRow[],
  example?: Record<string, string>,
) {
  const keys = header.cells.map((cell) => applyExample(cell.value, example));

  return bodies
    .map((body) => body.cells)
    .map((cells) => {
      const item: Record<string, string> = {};

      keys.forEach((key, idx) => {
        item[key] = applyExample(cells[idx].value, example);
      });

      return item;
    });
}

const feature = `
Feature: 패키지 스캐폴딩

        Background:
            Given "hello", "world" 템플릿이 존재한다.
              And "hello"의 템플릿 설정은 다음과 같다.
                  """
                  {
                    "description": "Hello 템플릿입니다.",
                    "targetPath": "{{repositoryRoot}}/packages/hello/{{name}}",
                    "args": {
                      "name": {
                        "description": "Hello 패키지 이름이 무엇인가요?",
                        "pattern": "^[a-z]+(-[a-z0-9]+)*$",
                        "handleError": "{{templateRoot}}/handlers/handle-name-error.ts"
                      }
                    }
                  }
                  """
              And "hello"의 runner는 다음과 같은 계산된 인자를 추가한다.
                  | inputArgs              | outputArgs                                          |
                  | { "name": "my-hello" } | { "name": "my-hello", "camelCasedName": "myHello" } |
              And "hello" 템플릿에 다음과 같은 소스 파일이 존재한다.
                  | path              | content                                                    |
                  | package.json.tmpl | { "name": "@repo/{{name}}-world", "private": true }        |
                  | src/index.ts.tmpl | export const {{camelCasedName}} = () => "Hello, {{name}}!" |
              And "hello" 템플릿의 "handle-name-error.ts" 핸들러는 다음 입력에 대해 다음 결과를 반환한다.
                  | input     | output                                   |
                  | myHello   | Hello 패키지 이름은 케밥케이스여야 합니다. (예: my-hello) |
                  | 123-hello | Hello 패키지 이름은 숫자로 시작할 수 없습니다.            |
              And "world"의 템플릿 설정은 다음과 같다.
                  """
                  {
                    "description": "World 템플릿입니다.",
                    "targetPath": "{{repositoryRoot}}/packages/world/{{name}}",
                    "args": {
                      "name": {
                        "description": "World 패키지 이름이 무엇인가요?"
                      },
                      "greet": {
                        "description": "인사말은 무엇인가요?"
                      },
                      "repoName": {
                        "description": "레포지토리 이름은 무엇인가요?",
                        "default": "{{name}}-world"
                      }
                    }
                  }
                  """
              And "world" 템플릿에 다음과 같은 소스 파일이 존재한다.
                  | path              | content                                           |
                  | package.json.tmpl | { "name": "@repo/{{repoName}}", "private": true } |
                  | src/index.ts.tmpl | console.log("{{greet}}, {{name}}!")               |

    Rule: 템플릿과 인자를 프롬프트로 입력할 수 있다.

        Scenario: 템플릿과 인자를 모두 프롬프트로 입력하여 hello 패키지를 생성한다.
             When 템플릿과 인자를 전달하지 않고 명령어를 실행한다.
              And 다음과 같이 프롬프트에 응답한다.
                  | question             | answer   |
                  | 템플릿을 선택해주세요          | hello    |
                  | Hello 패키지 이름이 무엇인가요? | my-hello |
             Then 스캐폴딩이 성공한다.
              And 생성된 패키지의 파일 구조는 다음과 같다.
                  | path                                 | content                                             |
                  | packages/hello/my-hello/package.json | { "name": "@repo/my-hello-world", "private": true } |
                  | packages/hello/my-hello/src/index.ts | export const myHello = () => "Hello, my-hello!"     |

        Scenario: 템플릿과 인자를 모두 프롬프트로 입력하여 world 패키지를 생성한다.
             When 템플릿과 인자를 전달하지 않고 명령어를 실행한다.
              And 다음과 같이 프롬프트에 응답한다.
                  | question             | answer   |
                  | 템플릿을 선택해주세요          | world    |
                  | World 패키지 이름이 무엇인가요? | my-hello |
                  | 인사말은 무엇인가요?          | Hello    |
             Then 스캐폴딩이 성공한다.
              And 생성된 패키지의 파일 구조는 다음과 같다.
                  | path                                 | content                                             |
                  | packages/world/my-hello/package.json | { "name": "@repo/my-hello-world", "private": true } |
                  | packages/world/my-hello/src/index.ts | console.log("Hello, my-hello!")                     |

    Rule: 명령어로 전달되지 않은 인자만 프롬프트로 입력받는다.

        Scenario: 템플릿만 전달하여 hello 패키지를 생성한다.
             When 템플릿 "hello"를 전달하고 명령어를 실행한다.
              And 다음과 같이 프롬프트에 응답한다.
                  | question             | answer   |
                  | Hello 패키지 이름이 무엇인가요? | my-hello |
             Then 스캐폴딩이 성공한다.
              And 생성된 패키지의 파일 구조는 다음과 같다.
                  | path                                 | content                                             |
                  | packages/hello/my-hello/package.json | { "name": "@repo/my-hello-world", "private": true } |
                  | packages/hello/my-hello/src/index.ts | export const myHello = () => "Hello, my-hello!"     |

        Scenario: 템플릿만 전달하여 world 패키지를 생성한다.
             When 다음과 같은 템플릿과 인자로 명령어를 실행한다.
                  | targetTemplate | args |
                  | world          | {}   |
              And 다음과 같이 프롬프트에 응답한다.
                  | question             | answer   |
                  | World 패키지 이름이 무엇인가요? | my-hello |
                  | 인사말은 무엇인가요?          | Hello    |
             Then 스캐폴딩이 성공한다.
              And 생성된 패키지의 파일 구조는 다음과 같다.
                  | path                                 | content                                             |
                  | packages/world/my-hello/package.json | { "name": "@repo/my-hello-world", "private": true } |
                  | packages/world/my-hello/src/index.ts | console.log("Hello, my-hello!")                     |

        Scenario: 일부 인자만 전달하여 world 패키지를 생성한다.
             When 다음과 같은 템플릿과 인자로 명령어를 실행한다.
                  | targetTemplate | args                   |
                  | world          | { "name": "my-hello" } |
              And 다음과 같이 프롬프트에 응답한다.
                  | question    | answer |
                  | 인사말은 무엇인가요? | Hello  |
             Then 스캐폴딩이 성공한다.
              And 생성된 패키지의 파일 구조는 다음과 같다.
                  | path                                 | content                                             |
                  | packages/world/my-hello/package.json | { "name": "@repo/my-hello-world", "private": true } |
                  | packages/world/my-hello/src/index.ts | console.log("Hello, my-hello!")                     |

    Rule: 모든 필수 인자를 명령어로 전달하면 프롬프트 없이 패키지를 생성한다.

        Scenario: 모든 인자를 전달하여 hello 패키지를 생성한다.
             When 다음과 같은 템플릿과 인자로 명령어를 실행한다.
                  | targetTemplate | args                   |
                  | hello          | { "name": "my-hello" } |
             Then 스캐폴딩이 성공한다.
              And 프롬프트가 출력되지 않는다.
              And 생성된 패키지의 파일 구조는 다음과 같다.
                  | path                                 | content                                             |
                  | packages/hello/my-hello/package.json | { "name": "@repo/my-hello-world", "private": true } |
                  | packages/hello/my-hello/src/index.ts | export const myHello = () => "Hello, my-hello!"     |

        Scenario: 모든 필수 인자를 전달하여 world 패키지를 생성한다.
             When 다음과 같은 템플릿과 인자로 명령어를 실행한다.
                  | targetTemplate | args                                     |
                  | world          | { "name": "my-hello", "greet": "Hello" } |
             Then 스캐폴딩이 성공한다.
              And 프롬프트가 출력되지 않는다.
              And 생성된 패키지의 파일 구조는 다음과 같다.
                  | path                                 | content                                             |
                  | packages/world/my-hello/package.json | { "name": "@repo/my-hello-world", "private": true } |
                  | packages/world/my-hello/src/index.ts | console.log("Hello, my-hello!")                     |

    Rule: 기본값은 다른 인자를 참조하여 계산할 수 있다.

        Scenario: 기본값을 가진 인자를 전달하지 않으면 계산된 기본값을 사용한다.
             When 다음과 같은 템플릿과 인자로 명령어를 실행한다.
                  | targetTemplate | args                                     |
                  | world          | { "name": "my-hello", "greet": "Hello" } |
             Then 스캐폴딩이 성공한다.
              And 생성된 "packages/world/my-hello/package.json" 파일의 내용은 다음과 같다.
                  """
                  { "name": "@repo/my-hello-world", "private": true }
                  """

    Rule: no-defaults 옵션을 사용하면 기본값이 있는 인자도 직접 입력받는다.

        Scenario: 인자 없이 no-defaults 옵션을 사용한다.
             When 다음과 같은 템플릿, 인자와 옵션으로 명령어를 실행한다.
                  | targetTemplate | args | flags       |
                  | world          | {}   | no-defaults |
              And 다음과 같이 프롬프트에 응답한다.
                  | question             | answer       |
                  | World 패키지 이름이 무엇인가요? | my-hello     |
                  | 인사말은 무엇인가요?          | Hello        |
                  | 레포지토리 이름은 무엇인가요?     | custom-world |
             Then 스캐폴딩이 성공한다.
              And 생성된 패키지의 파일 구조는 다음과 같다.
                  | path                                 | content                                           |
                  | packages/world/my-hello/package.json | { "name": "@repo/custom-world", "private": true } |
                  | packages/world/my-hello/src/index.ts | console.log("Hello, my-hello!")                   |

        Scenario: 일부 인자와 no-defaults 옵션을 함께 사용한다.
             When 다음과 같은 템플릿, 인자와 옵션으로 명령어를 실행한다.
                  | targetTemplate | args                   | flags       |
                  | world          | { "name": "my-hello" } | no-defaults |
              And 다음과 같이 프롬프트에 응답한다.
                  | question         | answer       |
                  | 인사말은 무엇인가요?      | Hello        |
                  | 레포지토리 이름은 무엇인가요? | custom-world |
             Then 스캐폴딩이 성공한다.
              And 생성된 패키지의 파일 구조는 다음과 같다.
                  | path                                 | content                                           |
                  | packages/world/my-hello/package.json | { "name": "@repo/custom-world", "private": true } |
                  | packages/world/my-hello/src/index.ts | console.log("Hello, my-hello!")                   |

    Rule: 잘못된 템플릿 인자는 파일을 생성하기 전에 거부한다.

        Scenario Outline: 프롬프트에 잘못된 hello 패키지 이름을 입력한다.
             When 템플릿과 인자를 전달하지 않고 명령어를 실행한다.
              And 다음과 같이 프롬프트에 응답한다.
                  | question             | answer |
                  | 템플릿을 선택해주세요          | hello  |
                  | Hello 패키지 이름이 무엇인가요? | <name> |
             Then 스캐폴딩이 실패한다.
              And "<message>" 오류 메시지가 출력된다.
              And 어떠한 파일이나 디렉터리도 생성되지 않는다.

        Examples:
                  | name      | message                                  |
                  | myHello   | Hello 패키지 이름은 케밥케이스여야 합니다. (예: my-hello) |
                  | 123-hello | Hello 패키지 이름은 숫자로 시작할 수 없습니다.            |

        Scenario Outline: 명령어에 잘못된 hello 패키지 이름을 전달한다.
             When 다음과 같은 템플릿과 인자로 명령어를 실행한다.
                  | targetTemplate | args                 |
                  | hello          | { "name": "<name>" } |
             Then 스캐폴딩이 실패한다.
              And "<message>" 오류 메시지가 출력된다.
              And 어떠한 파일이나 디렉터리도 생성되지 않는다.

        Examples:
                  | name      | message                                  |
                  | myHello   | Hello 패키지 이름은 케밥케이스여야 합니다. (예: my-hello) |
                  | 123-hello | Hello 패키지 이름은 숫자로 시작할 수 없습니다.            |

    Rule: 존재하지 않는 템플릿은 사용할 수 없다.

        Scenario: 존재하지 않는 템플릿을 전달한다.
             When 다음과 같은 템플릿과 인자로 명령어를 실행한다.
                  | targetTemplate | args |
                  | hello-world    | {}   |
             Then 스캐폴딩이 실패한다.
              And "\`hello-world\` 템플릿이 존재하지 않습니다." 오류 메시지가 출력된다.
              And 어떠한 파일이나 디렉터리도 생성되지 않는다.

    Rule: 템플릿 설정에 정의되지 않은 인자는 전달할 수 없다.

        Scenario: 알 수 없는 인자를 전달한다.
             When 다음과 같은 템플릿과 인자로 명령어를 실행한다.
                  | targetTemplate | args                                    |
                  | hello          | { "unknown": "Hello", "prop": "World" } |
             Then 스캐폴딩이 실패한다.
              And "\`hello\` 템플릿에 대한 알 수 없는 인자값이 전달되었습니다. (\`unknown\`, \`prop\`)" 오류 메시지가 출력된다.
              And 어떠한 파일이나 디렉터리도 생성되지 않는다.

        Scenario: runner가 계산하는 인자를 사용자가 직접 전달한다.
             When 다음과 같은 템플릿과 인자로 명령어를 실행한다.
                  | targetTemplate | args                                                   |
                  | hello          | { "name": "my-hello", "camelCasedName": "overridden" } |
             Then 스캐폴딩이 실패한다.
              And "\`hello\` 템플릿에 대한 알 수 없는 인자값이 전달되었습니다. (\`camelCasedName\`)" 오류 메시지가 출력된다.
              And 어떠한 파일이나 디렉터리도 생성되지 않는다.

    Rule: 생성 대상 경로가 이미 존재하면 기존 파일을 덮어쓰지 않는다.

        Scenario: 생성 대상 경로가 이미 존재한다.
            Given "packages/hello/my-hello" 경로가 이미 존재한다.
              And 해당 경로에 다음과 같은 파일이 존재한다.
                  | path         | content                |
                  | package.json | { "name": "existing" } |
             When 다음과 같은 템플릿과 인자로 명령어를 실행한다.
                  | targetTemplate | args                   |
                  | hello          | { "name": "my-hello" } |
             Then 스캐폴딩이 실패한다.
              And "\`packages/hello/my-hello\` 경로가 이미 존재합니다." 오류 메시지가 출력된다.
              And 기존 파일은 변경되지 않는다.
              And 새 파일이 생성되지 않는다.

`;

run();
