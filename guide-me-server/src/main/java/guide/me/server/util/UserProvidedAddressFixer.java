package guide.me.server.util;

import org.springframework.stereotype.Component;

/**
 * Dummy address fixer.
 * Appends ', Kraków, PL' to given address if not present.
 */
@Component
public class UserProvidedAddressFixer {

    private static final String SUFFIX = ", Kraków, PL";

    public String getFixedAddress(String address) {
        if (address == null) {
            return null;
        }

        if (!address.trim().endsWith(SUFFIX)) {
            address = address + SUFFIX;
        }

        return address;
    }
}
