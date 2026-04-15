import java.util.Scanner;

public class MD5 {

    // Standard MD5 initial buffer values
    static int A = 0x67452301;
    static int B = 0xEFCDAB89;
    static int C = 0x98BADCFE;
    static int D = 0x10325476;

    // Simulating MD5 Padding step (padding to a multiple of 16 characters for simplicity)
    static String padMessage(String text) {
        StringBuilder padded = new StringBuilder(text);
        padded.append((char) 128); // Append a 1 bit (0x80)
        
        while (padded.length() % 16 != 14) {
             padded.append((char) 0);
        }
        
        // Append length (simplified view of appending 64-bit length)
        padded.append((char) (text.length() % 256));
        padded.append((char) (text.length() / 256));
        
        return padded.toString();
    }

    // Simulating MD5 Non-linear Functions
    static int F(int X, int Y, int Z) { return (X & Y) | (~X & Z); }
    static int G(int X, int Y, int Z) { return (X & Z) | (Y & ~Z); }
    static int H(int X, int Y, int Z) { return X ^ Y ^ Z; }
    static int I(int X, int Y, int Z) { return Y ^ (X | ~Z); }

    // Simulating Left Rotate
    static int leftRotate(int x, int c) {
        return (x << c) | (x >>> (32 - c));
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.println("Enter string to hash:");
        String text = sc.nextLine();
        
        System.out.println("\nOriginal message: " + text);

        // STEP 1: Padding
        String paddedMessage = padMessage(text);
        System.out.println("\n--- Step 1: Padding ---");
        System.out.println("Padded message length: " + paddedMessage.length() + " chars");

        // STEP 2 & 3: Initialize Buffers (Already done globally)
        System.out.println("\n--- Step 2: Initialize Buffers ---");
        System.out.printf("A: %08X, B: %08X, C: %08X, D: %08X\n", A, B, C, D);

        // STEP 4: Process Message in Blocks (Simplified simulation of 1 block)
        System.out.println("\n--- Step 3: Process in 16-word blocks (Simulation) ---");
        
        int AA = A, BB = B, CC = C, DD = D;

        // Simulated Round 1
        System.out.println("Executing Round 1 (Function F) simulation...");
        for (int i = 0; i < paddedMessage.length(); i++) {
            int charVal = paddedMessage.charAt(i);
            A = B + leftRotate((A + F(B, C, D) + charVal), 7);
            
            // Rotate registers
            int temp = D;
            D = C;
            C = B;
            B = A;
            A = temp;
        }

        // Simulated Round 2
        System.out.println("Executing Round 2 (Function G) simulation...");
        for (int i = 0; i < paddedMessage.length(); i++) {
            int charVal = paddedMessage.charAt(i);
            A = B + leftRotate((A + G(B, C, D) + charVal), 12);
            
            // Rotate registers
            int temp = D;
            D = C;
            C = B;
            B = A;
            A = temp;
        }

        A += AA;
        B += BB;
        C += CC;
        D += DD;

        System.out.println("\n--- Final Step: Produce Output ---");
        // Output hash as hex string
        System.out.printf("MD5 Hash: %08X%08X%08X%08X\n", A, B, C, D);

        sc.close();
    }
}
