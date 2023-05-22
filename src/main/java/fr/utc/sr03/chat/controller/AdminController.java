package fr.utc.sr03.chat.controller;

import fr.utc.sr03.chat.dao.UserRepository;
import fr.utc.sr03.chat.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.WebRequest;

import java.util.List;
import java.util.Optional;

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
    public String getUserList(Model model,Model model1) {
        List<User> users = userRepository.findAll();
        model.addAttribute("users", users);

        List<User> user = userRepository.findAdminOnly();
        model1.addAttribute("usersadmin", user);

        return "user_list";
    }
    @PostMapping ("/disableUser/{id}")
    public String disableUser(int id) {
        userRepository.disableUser(id);
        return "redirect:/users";
    }

/*    // 启用用户
    @PostMapping("/enableUser/{id}")
    public String enableUser(@PathVariable("id") Long userId) {
        userService.enableUser(userId);
        return "redirect:/users";
    }

    // 编辑用户
    @GetMapping("/editUser/{id}")
    public String editUserForm(@PathVariable("id") Long userId, Model model) {
        User user = userService.getUserById(userId);
        model.addAttribute("user", user);
        return "editUserForm";
    }

    @PostMapping("/editUser/{id}")
    public String editUser(@PathVariable("id") Long userId, @ModelAttribute("user") User editedUser) {
        userService.updateUser(userId, editedUser);
        return "redirect:/users";
    }

    // 删除用户
    @PostMapping("/deleteUser/{id}")
    public String deleteUser(@PathVariable("id") Long userId) {
        userService.deleteUser(userId);
        return "redirect:/users";
    }

*/
   // @GetMapping("ajoute")
    //public  String ajoutealist(Model model){
      //  return "ajoute";
    //}

}
