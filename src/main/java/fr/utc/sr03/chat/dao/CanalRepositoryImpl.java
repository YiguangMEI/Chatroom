/*
package fr.utc.sr03.chat.dao;

import fr.utc.sr03.chat.model.Canal;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.List;

@Repository
public class CanalRepositoryImpl implements CanalRepositoryCustom {

    @PersistenceContext
    EntityManager entityManager;

    @Override
     public void DeleteBytitre(String tire) {
        Query query =entityManager.createQuery("SELECT c.id FROM Canal c WHERE c.titre =: tire",Canal.class);
        entityManager.remove(query);

    }
}
*/
