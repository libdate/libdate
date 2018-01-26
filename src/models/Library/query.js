import { SOURCES } from "../../constants/sources.const";

export default `
    library(name: String!, owner: String, source: Source=${SOURCES.GITHUB}, token: String!):Library
`;