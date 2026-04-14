import java.util.Scanner;

public class AES {

    // Simulating SubBytes step (Adding 1 to ASCII value)
    static char[] subBytes(char[] text) {
        char[] result = new char[text.length];
        for (int i = 0; i < text.length; i++) {
            result[i] = (char)(text[i] + 1);
        }
        return result;
    }

    // Simulating Inverse SubBytes
    static char[] invSubBytes(char[] text) {
        char[] result = new char[text.length];
        for (int i = 0; i < text.length; i++) {
            result[i] = (char)(text[i] - 1);
        }
        return result;
    }

    // Simulating ShiftRows step (Circular left shift by 1)
    static char[] shiftRows(char[] text) {
        char[] result = new char[text.length];
        for (int i = 0; i < text.length; i++) {
            result[i] = text[(i + 1) % text.length];
        }
        return result;
    }

    // Simulating Inverse ShiftRows (Circular right shift by 1)
    static char[] invShiftRows(char[] text) {
        char[] result = new char[text.length];
        for (int i = 0; i < text.length; i++) {
            result[(i + 1) % text.length] = text[i];
        }
        return result;
    }

    // Simulating AddRoundKey (XOR with a 16-char Key)
    static char[] addRoundKey(char[] text, String key) {
        char[] result = new char[text.length];
        for (int i = 0; i < text.length; i++) {
            result[i] = (char)(text[i] ^ key.charAt(i % key.length()));
        }
        return result;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.println("Enter 16 characters plaintext:");
        String text = sc.nextLine();
        if (text.length() != 16) {
            System.out.println("Error: Enter exactly 16 characters.");
            return;
        }

        System.out.println("Enter 16 characters key:");
        String key = sc.nextLine();
        if (key.length() != 16) {
            System.out.println("Error: Enter exactly 16 characters.");
            return;
        }

        System.out.println("\nPlain Text: " + text);
        char[] state = text.toCharArray();

        // -------- ENCRYPTION --------
        // STEP-1: AddRoundKey
        state = addRoundKey(state, key);
        System.out.print("After AddRoundKey (XOR): ");
        for (char c : state) System.out.print((int)c + " ");
        System.out.println();

        // STEP-2: SubBytes
        state = subBytes(state);
        System.out.print("After SubBytes: ");
        System.out.println(new String(state));

        // STEP-3: ShiftRows
        state = shiftRows(state);

        String cipher = new String(state);
        System.out.println("\nEncrypted Cipher (raw): " + cipher);

        // -------- DECRYPTION --------
        char[] decState = cipher.toCharArray();

        // Reverse Step-3: Inverse ShiftRows
        decState = invShiftRows(decState);
        
        // Reverse Step-2: Inverse SubBytes
        decState = invSubBytes(decState);

        // Reverse Step-1: AddRoundKey (XOR is its own inverse)
        decState = addRoundKey(decState, key);

        String decrypted = new String(decState);
        System.out.println("\nDecrypted Text: " + decrypted);

        sc.close();
    }
}
