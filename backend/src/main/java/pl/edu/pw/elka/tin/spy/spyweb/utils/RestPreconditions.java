package pl.edu.pw.elka.tin.spy.spyweb.utils;

public class RestPreconditions {
    public static <T> T checkFound(T resource) throws IllegalStateException {
        if (resource == null) {
            throw new IllegalStateException();
        }
        return resource;
    }
}
