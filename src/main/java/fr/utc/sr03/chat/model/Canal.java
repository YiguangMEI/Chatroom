package fr.utc.sr03.chat.model;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "sr03_canals")
public class Canal {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private int id;
    @Column(name="titre")
    private String titre;
    @Column(name="description")
    private String description;
    @Column(name="horaire")
    private Date horaire;
    @Column(name="duree")
    private int duree;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitre() {
        return titre;
    }

    public void setTitre(String titre) {
        this.titre = titre;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
    public Date getHoraire() {
        return horaire;
    }

    public void setHoraire(Date horaire) {
        this.horaire = horaire;
    }

    public int getDuree() {
        return duree;
    }

    public void setDuree(int duree) {
        this.duree = duree;
    }

}