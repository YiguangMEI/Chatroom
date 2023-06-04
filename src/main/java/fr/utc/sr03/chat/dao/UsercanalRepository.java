
package fr.utc.sr03.chat.dao;

import fr.utc.sr03.chat.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UsercanalRepository extends JpaRepository<Usercanal,Long>{
    // Requete generee automatiquement par Spring

    List<Usercanal> findByuser(@Param("user") User user);
}
