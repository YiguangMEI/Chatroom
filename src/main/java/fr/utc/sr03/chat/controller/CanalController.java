package fr.utc.sr03.chat.controller;

import fr.utc.sr03.chat.dao.CanalRepository;
import fr.utc.sr03.chat.dao.UserRepository;
import fr.utc.sr03.chat.dao.UsercanalRepository;
import fr.utc.sr03.chat.model.Canal;
import fr.utc.sr03.chat.model.User;
import fr.utc.sr03.chat.model.Usercanal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.server.ResponseStatusException;

import javax.servlet.http.HttpSession;
import javax.validation.constraints.Email;


import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

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
    @Autowired
    private HttpSession session;
    //login
    @PostMapping("/login")
    public User getLogin(@RequestBody Map<String, String> loginRequest) {
        String mail = loginRequest.get("mail");
        String password = loginRequest.get("password");
        User loggedUser = userRepository.findByMailAndPassword(mail, password);
        if (loggedUser != null) {
            session.setAttribute("loggedInUser", loggedUser);
            return loggedUser;
        } else {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED, "Invalid user"
            );
        }
    }

    @GetMapping("/rooms/inivitation")
    public List<Canal> getCanalInvitation(@RequestParam("user_Id") int user_id) {
        long userID = user_id;
        User user = userRepository.findById(userID).get();
        List<Usercanal> usercanals=usercanalRepository.findByuser(user);
        List<Canal> canals=new ArrayList<>();
        for (Usercanal usercanal:usercanals){
                canals.add(usercanal.getCanal());
        }
        return canals;
    }

    @GetMapping("/rooms/owner")
    public List<Canal> getCanalOwner(@RequestParam("user_Id") int user_id){
        long userID = user_id;
        User user = userRepository.findById(userID).get();
        return canalRepository.findByowner(user);
    }

    @DeleteMapping("/rooms/inviter/{canal_id}")
    public void quitterCanal(@PathVariable("canal_id") int canal_id, @RequestParam("user") int user_id) {
        long canalID = canal_id;
        long userID = user_id;
        User user = userRepository.findById(userID).get();
        Usercanal usercanal = usercanalRepository.findByuserAndCanal(user, canalRepository.findById(canalID).get());
        usercanalRepository.delete(usercanal);
    }
    @DeleteMapping("/rooms/owner/{canal_id}")
    public void supprimerCanal(@PathVariable("canal_id") int canal_id, @RequestParam("user") int user_id){
        long canalID = canal_id;
        long userID = user_id;
        User user = userRepository.findById(userID).get();
        Canal canal = canalRepository.findById(canalID).get();
        if (canal.getOwner().getId() == user.getId()){
            canalRepository.delete(canal);
        }
    }


    @PostMapping("/rooms/planifier")
    public Canal planifierCanal(@RequestBody Map<String, Object> requestBody) {
        int user_id= (int) requestBody.get("user_id");
        String canal_name = (String) requestBody.get("canal_name");
        String canal_description = (String) requestBody.get("canal_description");
        String canal_date = (String) requestBody.get("canal_date");
        int canal_time = (int) requestBody.get("canal_time");

        long userID = user_id;
        String formatPattern = "yyyy-MM-dd";
        SimpleDateFormat formatter = new SimpleDateFormat(formatPattern);
        User user = userRepository.findById(userID).get();
        try {
            Date date = formatter.parse(canal_date);
            Canal canal = new Canal(canal_name, canal_description,date,canal_time, user);
            canalRepository.save(canal);
            return canal;
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
    }
    //邀请新用户到canal
    @PostMapping("/rooms/inviter")
    public void inviterUser(@RequestParam("canal_id") int canal_id, @RequestParam("user_id") int user_id) {
        long canalID = canal_id;
        long userID = user_id;
        User user = userRepository.findById(userID).get();
        Canal canal = canalRepository.findById(canalID).get();
        Usercanal usercanal = new Usercanal(canal, user);
        usercanalRepository.save(usercanal);
    }
    //加入canal
    @PostMapping("/rooms/join")
    public void joinCanal(@RequestParam("canal_id") int canal_id, @RequestParam("user_id") int user_id) {
        long canalID = canal_id;
        long userID = user_id;
        User user = userRepository.findById(userID).get();
        Canal canal = canalRepository.findById(canalID).get();
        Usercanal usercanal = new Usercanal(canal, user);
        usercanalRepository.save(usercanal);
    }

}
