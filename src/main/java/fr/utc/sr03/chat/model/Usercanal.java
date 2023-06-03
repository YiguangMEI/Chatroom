package fr.utc.sr03.chat.model;
import javax.persistence.*;

@Entity
@Table(name = "user_canal")
public class Usercanal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "canal_id")
    private Canal canal;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    // 其他属性、构造函数和getter/setter方法
    // ...
}
