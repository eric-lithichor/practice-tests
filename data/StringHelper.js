export default class StringHelper {
    static spacesToDashes(str) {
        return str.replace(/ /g, '-');
    }

    static spacesToUnderscores(str) {
        return str.replace(/ /g, '_');
    }
}