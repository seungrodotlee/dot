export type If<
  TargetAndCondition extends [unknown, unknown],
  TrueValue,
  ElseValue,
> = TargetAndCondition[0] extends TargetAndCondition[1] ? TrueValue : ElseValue;
