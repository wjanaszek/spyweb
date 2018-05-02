package pl.edu.pw.elka.tin.spy.spyweb.application.domain;

import lombok.Getter;

@Getter
public enum Status {
    CONNECTED("CON"), DISCONNECTED("DC"), NEW("NEW");

    private String text;

    Status(String text) {
        this.text = text;
    }
}
