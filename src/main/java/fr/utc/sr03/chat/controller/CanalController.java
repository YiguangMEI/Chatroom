package fr.utc.sr03.chat.controller;

import fr.utc.sr03.chat.dao.UserRepository;
import fr.utc.sr03.chat.dao.UsercanalRepository;
import fr.utc.sr03.chat.model.User;
import fr.utc.sr03.chat.model.Usercanal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
/**
 * URL de base du endpoint : http://localhost:8080/canal<br>
 * ex users : http://localhost:8080/canal/{username}
 */
@RestController
@RequestMapping("canal")
public class CanalController {
    @Autowired
    private UsercanalRepository usercanalRepository;
    private UserRepository userRepository;
    @GetMapping("/{user_id}")
    public List<Usercanal> getCanal(@RequestParam Long user_id) {
        User user = userRepository.findById(user_id).get();
        return usercanalRepository.findByuser(user);
    }

    @GetMapping("supprimer")
    public void SupprimerCanal(@RequestParam Long canal_id){
        usercanalRepository.deleteById(canal_id);
    }

//    @GetMapping("add")
//    public void addCanal(@RequestParam Long user_id, @RequestParam Long canal_id){
//        User user = userRepository.findById(user_id).get();
//        Usercanal usercanal = new Usercanal();
//        usercanal.setCanal_id(canal_id);
//        usercanal.setUser(user);
//        usercanalRepository.save(usercanal);
//    }
}
