import java.math.BigInteger;
import java.util.Scanner;

public class DH_Bob {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("=== Diffie-Hellman Key Exchange (Person B: Bob) ===");
        
        // 1. Receive public factors from Alice
        System.out.print("Enter public Prime Number (P) from Alice: ");
        BigInteger p = sc.nextBigInteger();
        
        System.out.print("Enter public Primitive Root (G) from Alice: ");
        BigInteger g = sc.nextBigInteger();
        
        // 2. Receive Alice's public key
        System.out.print("Enter Alice's Public Key (A) received from her: ");
        BigInteger A = sc.nextBigInteger();
        
        // 3. Bob's Private Key
        System.out.print("Enter Bob's Private Key (b): ");
        BigInteger b = sc.nextBigInteger();
        
        // 4. Compute Bob's Public Key --> B = (G^b) % P
        BigInteger B = g.modPow(b, p);
        
        System.out.println("\n[Action] Bob's Public Key (B) calculated as: " + B);
        System.out.println("===> Send this 'B' value (" + B + ") back to Alice.");
        
        // 5. Compute Shared Secret --> Secret = (A^b) % P
        BigInteger sharedSecret = A.modPow(b, p);
        
        System.out.println("\n--- BOB'S RESULT ---");
        System.out.println("Secret Key established = " + sharedSecret);
        
        sc.close();
    }
}
