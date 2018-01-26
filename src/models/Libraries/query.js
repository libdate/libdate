import { SOURCES } from "../../constants/sources.const";

export default `
    libraries(names: String! source: Source=${SOURCES.GITHUB}, token: String!):[Library]
`;