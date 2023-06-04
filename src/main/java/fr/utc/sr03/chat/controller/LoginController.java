package fr.utc.sr03.chat.controller;

import fr.utc.sr03.chat.dao.UserRepository;
import fr.utc.sr03.chat.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.WebRequest;
import java.util.UUID;
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
    public String postLogin(@ModelAttribute User user, @RequestParam(value = "admin", defaultValue = "false") String adminMode, Model model) {
        User loggedUser = userRepository.findByMailAndPassword(user.getMail(), user.getPassword());

        if (loggedUser != null) {
            if (adminMode.equals("true") && loggedUser.isAdmin()) {
                // 在会话中存储已登录的用户信息
                session.setAttribute("loggedInUser", loggedUser);
                return "redirect:/admin/users";
            } else if (adminMode.equals("false")) {
                session.setAttribute("loggedInUser", loggedUser);
                return "client";
            } else {
                model.addAttribute("invalid", true);
                return "login";
            }
        } else {
            model.addAttribute("invalid", true);
            return "login";
        }
    }

    @GetMapping("/reset-password")
    public String showResetPasswordForm() {
        return "reset";
    }

//    @PostMapping("/reset-password")
//    public String resetPassword(@RequestParam("email") String email) {
//        User user = userRepository.findByMail(email);
//        if (user != null) {
//            // 生成密码重置令牌
//            String resetToken = UUID.randomUUID().toString();
//
//            // 将令牌与用户关联存储到数据库中
//            user.setResetToken(resetToken);
//            userRepository.save(user);
//
//            // 构建重置链接
//            String resetLink = "http://yourwebsite.com/reset/" + resetToken;
//
//            // 发送包含重置链接的电子邮件
//            SimpleMailMessage message = new SimpleMailMessage();
//            message.setTo(user.getMail());
//            message.setSubject("Password Reset");
//            message.setText("Please click the following link to reset your password: " + resetLink);
//            emailSender.send(message);
//        }
//        // 无论电子邮件地址是否有效，都重定向到登录页面
//        return "redirect:/login";
//    }
}


