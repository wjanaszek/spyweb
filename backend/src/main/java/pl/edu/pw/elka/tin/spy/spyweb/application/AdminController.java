package pl.edu.pw.elka.tin.spy.spyweb.application;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import pl.edu.pw.elka.tin.spy.spyweb.application.domain.Admin;
import pl.edu.pw.elka.tin.spy.spyweb.application.domain.AdminRepository;
import pl.edu.pw.elka.tin.spy.spyweb.application.exception.ResourceNotFoundException;
import pl.edu.pw.elka.tin.spy.spyweb.utils.RestPreconditions;

@RestController
@CrossOrigin
@RequestMapping("/api")
class AdminController {

    @Autowired
    private AdminRepository adminRepository;

    @PostMapping("/login")
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    public Admin logIn(@RequestBody Admin admin) throws ResourceNotFoundException {
        Admin toCheck = RestPreconditions.checkFound(this.adminRepository.findByLogin(admin.getLogin()));
        if (toCheck != null && toCheck.getPassword().equals(admin.getPassword())) {
            toCheck.setLoggedIn(true);
            return adminRepository.save(toCheck);
        } else {
            throw new ResourceNotFoundException();
        }
    }
}
