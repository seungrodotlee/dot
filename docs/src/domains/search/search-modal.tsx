import { useSearchBox } from "react-instantsearch";
import { ChangeEventHandler, useMemo } from "react";

import algoliasearch from "algoliasearch";

import Modal from "../@ui/overlay/modal/modal.component";

import { SearchModalProps } from "./search-modal.types";

const SearchModal = ({ onClose }: SearchModalProps) => {
  const { query, refine } = useSearchBox();

  const searchClient = useMemo(() => {
    return algoliasearch(
      process.env.GATSBY_ALGOLIA_APP_ID!,
      process.env.GATSBY_ALGOLIA_SEARCH_KEY!,
    );
  }, []);

  const searchInputHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    refine(e.target.value);
  };

  return (
    <Modal title="내용 검색" onClose={onClose}>
      <Modal.Header></Modal.Header>
      <Modal.Body>
        <input
          value={query}
          placeholder="검색어를 입력하세요"
          onChange={searchInputHandler}
        />
      </Modal.Body>
    </Modal>
  );
};

export default SearchModal;
