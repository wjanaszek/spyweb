package pl.edu.pw.elka.tin.spy.spyweb.application.domain;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User, Integer> {
    User findByLogin(String login);
}
