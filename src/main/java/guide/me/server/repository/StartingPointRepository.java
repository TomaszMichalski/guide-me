package guide.me.server.repository;

import guide.me.server.model.StartingPoint;
import guide.me.server.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface StartingPointRepository extends JpaRepository<StartingPoint, Long> {

    Optional<StartingPoint> findByUser(User user);

    Boolean existsByUser(User user);

    @Transactional
    void deleteByUser(User user);

    void deleteAllByUser(User user);

    List<StartingPoint> findAllByUser(User user);
}
