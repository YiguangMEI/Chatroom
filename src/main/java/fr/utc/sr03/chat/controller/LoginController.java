package fr.utc.sr03.chat.controller;

import fr.utc.sr03.chat.dao.UserRepository;
import fr.utc.sr03.chat.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.context.request.WebRequest;

import javax.servlet.http.HttpSession;

/**
 * URL de base du endpoint : http://localhost:8080/login
 */
@Controller
@RequestMapping("login")
public class LoginController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private HttpSession session;

    @GetMapping
    public String getLogin(Model model) {
        model.addAttribute("user", new User());
        return "login";
    }

    @PostMapping
    public String postLogin(@ModelAttribute User user, Model model) {
        User loggedUser = userRepository.findByMailAndPassword(user.getMail(), user.getPassword());

        if (loggedUser != null && loggedUser.isAdmin()){
            // 在会话中存储已登录的用户信息
            session.setAttribute("loggedInUser", loggedUser);
            return "redirect:/admin/users";
        }
        else{
            model.addAttribute("invalid", true);
            return "login";
        }
    }
}
