package pl.edu.pw.elka.tin.spy.spyweb.application;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import pl.edu.pw.elka.tin.spy.spyweb.application.domain.User;
import pl.edu.pw.elka.tin.spy.spyweb.application.domain.UserRepository;
import pl.edu.pw.elka.tin.spy.spyweb.application.exception.ResourceNotFoundException;
import pl.edu.pw.elka.tin.spy.spyweb.utils.RestPreconditions;

@RestController
@CrossOrigin
@RequestMapping("/api")
class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    public User logIn(@RequestBody User user) throws ResourceNotFoundException {
        User toCheck = RestPreconditions.checkFound(this.userRepository.findByLogin(user.getLogin()));
        if (toCheck != null && toCheck.getPassword().equals(user.getPassword())) {
            toCheck.setLoggedIn(true);
            return userRepository.save(toCheck);
        } else {
            throw new ResourceNotFoundException();
        }
    }
}
