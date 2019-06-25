package guide.me.server.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users", uniqueConstraints = {
                @UniqueConstraint(columnNames = "email")
})
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Email
    @Column(nullable = false)
    private String email;

    private String imageUrl;

    @Column(nullable = false)
    private Boolean emailVerified = false;

    @JsonIgnore
    private String password;

    @NotNull
    @Enumerated(EnumType.STRING)
    private AuthProvider provider;

    private String providerId;

    @ManyToMany(cascade = { CascadeType.ALL })
    @JoinTable(
            name = "user_category",
            joinColumns = { @JoinColumn(name = "user_id") },
            inverseJoinColumns = { @JoinColumn(name = "category_id") }
    )
    private Set<Category> categories = new HashSet<>();

    @ManyToMany(cascade = { CascadeType.ALL })
    @JoinTable(
            name = "user_place",
            joinColumns = { @JoinColumn(name = "user_id") },
            inverseJoinColumns = { @JoinColumn(name = "place_id") }
    )
    private Set<Place> places = new HashSet<>();

    @OneToMany(mappedBy = "user")
    @JsonIgnoreProperties("user")
    private Set<StartingPoint> startingPoints = new HashSet<>();

    public Long getId()
    {
        return id;
    }

    public void setId(Long id)
    {
        this.id = id;
    }

    public String getName()
    {
        return name;
    }

    public void setName(String name)
    {
        this.name = name;
    }

    public String getEmail()
    {
        return email;
    }

    public void setEmail(String email)
    {
        this.email = email;
    }

    public String getImageUrl()
    {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl)
    {
        this.imageUrl = imageUrl;
    }

    public Boolean getEmailVerified()
    {
        return emailVerified;
    }

    public void setEmailVerified(Boolean emailVerified)
    {
        this.emailVerified = emailVerified;
    }

    public String getPassword()
    {
        return password;
    }

    public void setPassword(String password)
    {
        this.password = password;
    }

    public AuthProvider getProvider()
    {
        return provider;
    }

    public void setProvider(AuthProvider provider)
    {
        this.provider = provider;
    }

    public String getProviderId()
    {
        return providerId;
    }

    public void setProviderId(String providerId)
    {
        this.providerId = providerId;
    }

    public Set<Category> getCategories() {
        return categories;
    }

    public void setCategories(Set<Category> categories) {
        this.categories = categories;
    }

    public Set<Place> getPlaces() {
        return places;
    }

    public void setPlaces(Set<Place> places) {
        this.places = places;
    }

    public Set<StartingPoint> getStartingPoints() {
        return startingPoints;
    }

    public void setStartingPoints(Set<StartingPoint> startingPoints) {
        this.startingPoints = startingPoints;
    }
}