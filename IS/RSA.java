import java.math.BigInteger;
import java.util.Scanner;

public class RSA {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter first prime number p: ");
        BigInteger p = sc.nextBigInteger();
        
        System.out.print("Enter second prime number q: ");
        BigInteger q = sc.nextBigInteger();
        
        sc.nextLine();
        
        System.out.println("\nEnter a simple plain text message to encrypt:");
        String text = sc.nextLine();
        
        // Step 1: Calculate n = p * q
        BigInteger n = p.multiply(q);
        
        // Ensure n is large enough for the ASCII table
        if (n.compareTo(BigInteger.valueOf(255)) <= 0) {
            System.out.println("\nError: The product of p and q (n = " + n + ") is too small!");
            System.out.println("It must be greater than 255 to encrypt standard text characters.");
            System.out.println("Please run the program again and choose larger prime numbers (e.g., 17 and 19).");
            sc.close();
            return;
        }

        // Step 2: Calculate phi(n) or z = (p-1) * (q-1)
        BigInteger phi = p.subtract(BigInteger.ONE).multiply(q.subtract(BigInteger.ONE));
        
        System.out.println("\n--- Key Generation ---");
        System.out.println("n = p * q = " + n);
        System.out.println("phi(n) = (p-1)*(q-1) = " + phi);
        
        // Step 3: Choose 'e' such that 1 < e < phi, and gcd(e, phi) = 1 (coprime)
        BigInteger e = BigInteger.valueOf(2);
        while (e.compareTo(phi) < 0) {
            if (e.gcd(phi).equals(BigInteger.ONE)) {
                break;
            }
            e = e.add(BigInteger.ONE);
        }
        System.out.println("Public key 'e' = " + e);
        
        // Step 4: Calculate 'd' such that (d * e) % phi = 1
        BigInteger d = e.modInverse(phi);
        System.out.println("Private key 'd' = " + d);
        System.out.println("Public Key: (" + e + ", " + n + ")");
        System.out.println("Private Key: (" + d + ", " + n + ")");
        
        // -------- ENCRYPTION --------
        // Convert each character into its ASCII integer value and encrypt it individually
        System.out.println("\n--- Encryption ---");
        System.out.println("Original Message: " + text);
        
        BigInteger[] encryptedData = new BigInteger[text.length()];
        System.out.print("Encrypted Message (Numerical Array): ");
        for (int i = 0; i < text.length(); i++) {
            BigInteger m = BigInteger.valueOf((int) text.charAt(i));
            encryptedData[i] = m.modPow(e, n); // c = (m ^ e) % n
            System.out.print(encryptedData[i] + " ");
        }
        System.out.println();
        
        // -------- DECRYPTION --------
        // Decrypt each numerical value back to characters
        System.out.println("\n--- Decryption ---");
        StringBuilder decryptedText = new StringBuilder();
        for (int i = 0; i < encryptedData.length; i++) {
            BigInteger c = encryptedData[i];
            BigInteger m = c.modPow(d, n);     // m = (c ^ d) % n
            decryptedText.append((char) m.intValue());
        }
        System.out.println("Decrypted Message: " + decryptedText.toString());
        
        sc.close();
    }
}