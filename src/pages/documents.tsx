import { Flex, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { documentQueries } from "../api/document.queries";
import PageTitle from "../components/common/page-title";
import Seo from "../components/common/seo";
import DocumentGrid from "../components/documents/document-grid";

export default function Documents() {
  const { data: documents = [] } = useQuery(documentQueries.list());
  const [search, setSearch] = useState("");
  const filteredDocuments = documents.filter(
    (document) =>
      document.title?.toLowerCase().includes(search) ||
      document.programme?.toLowerCase()?.includes(search) ||
      document.session?.toLowerCase()?.includes(search) ||
      document.semester?.toLowerCase()?.includes(search)
  );

  return (
    <>
      <Seo title="Documents" />
      <PageTitle showBackButton>Documents</PageTitle>
      <Flex justify="flex-end" mb={8}>
        <InputGroup maxW={80}>
          <Input
            type="search"
            variant="primary"
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
            placeholder="Search for a document"
          />
          <InputLeftElement>
            <IoSearchOutline fontSize="1.5rem" />
          </InputLeftElement>
        </InputGroup>
      </Flex>
      <DocumentGrid documents={filteredDocuments} />
    </>
  );
}
