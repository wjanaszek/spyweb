package pl.edu.pw.elka.tin.spy.spyweb.application;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import pl.edu.pw.elka.tin.spy.spyweb.application.domain.*;
import pl.edu.pw.elka.tin.spy.spyweb.application.exception.ResourceNotFoundException;
import pl.edu.pw.elka.tin.spy.spyweb.utils.RestPreconditions;

import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/users")
@Slf4j
class UserController {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private TaskRepository taskRepository;

    @GetMapping
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @PostMapping("/{id}")
    @ResponseStatus(HttpStatus.CREATED)
    public Task addTaskToUser(@PathVariable Integer id) throws ResourceNotFoundException {
        User user = userRepository.findById(id)
                .orElseThrow(ResourceNotFoundException::new);
        Task task = new Task(user);
        log.info("Creating task " + task.toString() + " for user " + user.toString());
        return this.taskRepository.save(task);
    }

    @GetMapping("/{id}")
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    public User getUser(@PathVariable Integer id) throws ResourceNotFoundException {
        return RestPreconditions.checkFound(this.userRepository.findById(id)
                .orElseThrow(ResourceNotFoundException::new));
    }

}
