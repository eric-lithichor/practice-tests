export default class StringHelper {
    static spacesToDashes(str) {
        try {
            return str.replace(/ /g, '-');
        }
        catch(err) {
            throw new Error(`STRING: ${str}`, err);
        }
    }

    static spacesToUnderscores(str) {
        try {
            return str.replace(/ /g, '_');
        }
        catch(err) {
            throw new Error(`STRING: ${str}`, err);
        }
    }
}