package guide.me.server.payload;

import guide.me.server.model.Category;

import javax.validation.constraints.NotBlank;

public class UserCategoryRequest {
    private Category category;

    private Long userId;

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
