package fr.utc.sr03.chat.controller;

import fr.utc.sr03.chat.dao.UserRepository;
import fr.utc.sr03.chat.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

//import java.awt.print.Pageable;
import java.util.List;

import static org.hibernate.tool.schema.SchemaToolingLogging.LOGGER;

/**
 * URL de base du endpoint : http://localhost:8080/admin<br>
 * ex users : http://localhost:8080/admin/users
 */
@Controller
@RequestMapping("admin")
public class AdminController {
    @Autowired
    private UserRepository userRepository;

    @GetMapping("users")
    public  String getUserList(Model model){

        List<User> users = userRepository.findAll();
        model.addAttribute("users", users);

        return "user_list";
    }

    @PostMapping("disable")
    public String disableUser(@RequestParam Long id) {
        userRepository.findById(id).ifPresent(user -> {
            user.setEnabled(false);
            userRepository.save(user);
        });
        return "redirect:/admin/users";
    }

    @PostMapping("enable")
    public String enableUser(@RequestParam Long id) {
        userRepository.findById(id).ifPresent(user -> {
            user.setEnabled(true);
            userRepository.save(user);
        });
        return "redirect:/admin/users";
    }
    @PostMapping("supprimer")
    public String SupprimerUser(@RequestParam Long id){
        userRepository.deleteById(id);
        return "redirect:/admin/users";
    }

    @GetMapping("edit")
    public String editUser(@RequestParam Long id, Model model) {
        userRepository.findById(id).ifPresent(user -> model.addAttribute("user", user));
        return "user_edit";
    }
    @PostMapping("update")
    public String updateUser(@ModelAttribute User user,Model model) {
        User editUser = userRepository.findByMail(user.getMail());
        if (editUser != null && editUser.getId()!=user.getId()) {
            model.addAttribute("errorMessage", "Email already exists");
            return "user_edit";

        } else {

            // 在会话中存储已登录的用户信息
            userRepository.save(user);
            return "redirect:/admin/users";
        }
    }

    @GetMapping("ajoute")
    public String getUser(Model model) {
        model.addAttribute("user", new User());
        return "ajoute";
    }

    @GetMapping("list_desactive")
    public String getUserdesactive(Model model) {
        List<User> users = userRepository.findBYenabled(false);
        model.addAttribute("users", users);
        return "user_list";
    }

    @PostMapping("ajoute")
    public String addUser(@ModelAttribute User user,Model model) {
        User newUser = user;
        LOGGER.info(newUser.getFirstName() + "");

        User addUser = userRepository.findByMail(user.getMail());
        if (addUser != null) {
            model.addAttribute("errorMessage", "Email already exists");
            return "ajoute";

        } else {

            // 在会话中存储已登录的用户信息
            userRepository.save(newUser);
            List<User> users = userRepository.findAll();
            model.addAttribute("users", users);
            return "redirect:/admin/users";
        }
    }


}
