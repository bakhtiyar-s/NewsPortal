package com.epam.validation;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class TitleLengthValidator implements ConstraintValidator<TitleLengthConstraint, String> {

    @Override
    public void initialize(TitleLengthConstraint constraintAnnotation) {
    }

    @Override
    public boolean isValid(String title, ConstraintValidatorContext constraintValidatorContext) {
        return title!=null && title.length() >= 20 && title.length() <= 200;
    }
}
