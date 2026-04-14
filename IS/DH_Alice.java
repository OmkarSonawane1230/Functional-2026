import java.math.BigInteger;
import java.util.Scanner;

public class DH_Alice {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("=== Diffie-Hellman Key Exchange (Person A: Alice) ===");
        
        // 1. Agree on public factors
        System.out.print("Enter a public Prime Number (P): ");
        BigInteger p = sc.nextBigInteger();
        
        System.out.print("Enter a public Primitive Root (G): ");
        BigInteger g = sc.nextBigInteger();
        
        // 2. Alice's Private Key
        System.out.print("Enter Alice's Private Key (a): ");
        BigInteger a = sc.nextBigInteger();
        
        // 3. Compute Alice's Public Key --> A = (G^a) % P
        BigInteger A = g.modPow(a, p);
        
        System.out.println("\n[Action] Alice's Public Key (A) calculated as: " + A);
        System.out.println("===> Give Bob these numbers: P=" + p + ", G=" + g + ", and A=" + A);
        
        // 4. Wait for Bob's Public Key
        System.out.print("\nWaiting for Bob... Enter the Public Key received from Bob (B): ");
        BigInteger B = sc.nextBigInteger();
        
        // 5. Compute Shared Secret --> Secret = (B^a) % P
        BigInteger sharedSecret = B.modPow(a, p);
        
        System.out.println("\n--- ALICE'S RESULT ---");
        System.out.println("Secret Key established = " + sharedSecret);
        
        sc.close();
    }
}