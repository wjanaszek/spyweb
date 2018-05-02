package pl.edu.pw.elka.tin.spy.spyweb.application;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import pl.edu.pw.elka.tin.spy.spyweb.application.domain.*;
import pl.edu.pw.elka.tin.spy.spyweb.application.exception.ResourceNotFoundException;
import pl.edu.pw.elka.tin.spy.spyweb.utils.RestPreconditions;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/clients")
@Slf4j
class ClientController {

    @Autowired
    private ClientRepository clientRepository;
    @Autowired
    private TaskRepository taskRepository;

    @GetMapping("/")
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    public List<Client> getAllClients() {
        return clientRepository.findAll();
    }

    @PostMapping("/{id}")
    @ResponseStatus(HttpStatus.CREATED)
    public Task addTaskToClient(@PathVariable Integer id) throws ResourceNotFoundException {
        Client client = clientRepository.findById(id)
                .orElseThrow(ResourceNotFoundException::new);
        log.info("Creating task to client " + client.toString());
        return this.taskRepository.save(new Task.TaskBuilder(Status.NEW.getText(), client).build());
    }

    @GetMapping("/{id}")
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    public Client getClient(@PathVariable Integer id) throws ResourceNotFoundException {
        return RestPreconditions.checkFound(this.clientRepository.findById(id)
                .orElseThrow(ResourceNotFoundException::new));
    }

}
