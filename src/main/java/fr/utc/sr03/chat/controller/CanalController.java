package fr.utc.sr03.chat.controller;

import fr.utc.sr03.chat.dao.CanalRepository;
import fr.utc.sr03.chat.dao.UserRepository;
import fr.utc.sr03.chat.dao.UsercanalRepository;
import fr.utc.sr03.chat.model.User;
import fr.utc.sr03.chat.model.Usercanal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.server.ResponseStatusException;

import javax.servlet.http.HttpSession;


import java.util.List;
/**
 * URL de base du endpoint : http://localhost:8080/canal<br>
 * ex users : http://localhost:8080/canal/{username}
 */
@RestController
@RequestMapping("api")
@CrossOrigin(origins = "http://localhost:3000")
public class CanalController {
    @Autowired
    private UsercanalRepository usercanalRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CanalRepository canalRepository;

    //login
    @PostMapping("/login")
    public User getLogin(@RequestParam("mail") String mail, @RequestParam("password") String password) {
        User loggedUser = userRepository.findByMailAndPassword(mail, password);
        if (loggedUser != null) {
            return loggedUser;
        } else {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED, "Invalid user"
            );
        }
    }

    @GetMapping("/rooms")
    public List<Usercanal> getCanal(@RequestParam("user_Id") int user_id) {
        long userID = user_id;
        User user = userRepository.findById(userID).get();
        return usercanalRepository.findByuser(user);
    }

    @DeleteMapping("/rooms/{canal_id}")
    public void deleteCanal(@PathVariable("canal_id") int canal_id, @RequestParam("user") int user_id) {
        long userID = user_id;
        User user = userRepository.findById(userID).get();
        Usercanal usercanal = usercanalRepository.findByuserAndCanal(user, canalRepository.findById(canalID).get());
        usercanalRepository.delete(usercanal);
    }


    }



}
