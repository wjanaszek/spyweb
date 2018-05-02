package pl.edu.pw.elka.tin.spy.spyweb.application.domain;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClientRepository extends CrudRepository<Client, Integer> {
    List<Client> findAll();
}
