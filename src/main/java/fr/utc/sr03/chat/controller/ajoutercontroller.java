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

import java.util.List;
import java.util.Optional;

import static org.hibernate.tool.schema.SchemaToolingLogging.LOGGER;

@Controller
@RequestMapping("/admin/ajoute")
public class ajoutercontroller {
    @Autowired
    private UserRepository userRepository;
    @PostMapping("")
    public String addUser(@ModelAttribute User user,Model model) {
        User newUser=user;
        LOGGER.info(newUser.getFirstName()+"");
        userRepository.save(newUser);


        List<User> users = userRepository.findAll();
        model.addAttribute("users", users);
        return "user_list";
    }
}
