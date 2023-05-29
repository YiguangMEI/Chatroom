package fr.utc.sr03.chat.controller;

import fr.utc.sr03.chat.dao.UserRepository;
import fr.utc.sr03.chat.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.WebRequest;

//import java.awt.print.Pageable;
import java.util.List;
import java.util.Optional;
import javax.servlet.http.HttpSession;
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

//    @GetMapping("users")
//    public  String getUserList(Model model,HttpSession session,
//                                @RequestParam(defaultValue = "0") int page,
//                                @RequestParam(defaultValue = "5") int size){
//        String searchQuery = (String) session.getAttribute("searchQuery");
//        String sortBy = (String) session.getAttribute("sortBy");
//        String sortOrder = (String) session.getAttribute("sortOrder");
//        Pageable pageable= PageRequest.of(page, size, Sort.by(Sort.Direction.fromString(sortOrder), sortBy));
//        Page<User> userPage;
//
//        if (!searchQuery.isEmpty()) {
//            userPage = userRepository.searchUsers(searchQuery, pageable);
//        } else {
//            userPage = userRepository.findAll(pageable);
//        }
//        int totalPages= userPage.getTotalPages();
//
//        List<User> users = userPage.getContent();
//
//        List<User> user = userRepository.findAdminOnly();
//        model.addAttribute("users", users);
//        model.addAttribute("usersAdmin", user);
//
//        model.addAttribute("hasPreviousPage", userPage.hasPrevious());
//        model.addAttribute("hasNextPage", userPage.hasNext());
//        model.addAttribute("currentPage", page);
//        model.addAttribute("totalPages", totalPages);
//        return "user_list";
//    }

    @GetMapping("users")
    public  String getUserList(Model model){

        List<User> users = userRepository.findAll();
        model.addAttribute("users", users);

        return "user_list1";
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
    public String updateUser(@ModelAttribute User user) {
        userRepository.save(user);
        return "redirect:/admin/users";
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
        return "user_list1";
    }

    @PostMapping("ajoute")
    public String addUser(@ModelAttribute User user,Model model) {
        User newUser=user;
        LOGGER.info(newUser.getFirstName()+"");
        userRepository.save(newUser);

        List<User> users = userRepository.findAll();
        model.addAttribute("users", users);
        return "redirect:/admin/users";
    }


}
