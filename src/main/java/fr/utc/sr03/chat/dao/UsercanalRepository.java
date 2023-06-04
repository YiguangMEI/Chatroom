
package fr.utc.sr03.chat.dao;

import fr.utc.sr03.chat.model.Usercanal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

public interface UsercanalRepository extends JpaRepository<Usercanal,Long>{
    // Requete generee automatiquement par Spring
    Usercanal findByuserid(@Param("user_id") Long user_id);
}
