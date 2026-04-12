class MedicalExpertSystem:
    def __init__(self):
        self.symptoms = []
        self.diseases = {
            "Common Cold": ["cough", "runny nose", "sneezing", "sore throat"],
            "Flu": ["fever", "chills", "muscle aches", "cough", "congestion"],
            "Malaria": ["fever", "chills", "sweating", "headache", "nausea"],
            "Typhoid": ["high fever", "headache", "stomach pain", "weakness"],
            "COVID-19": ["fever", "dry cough", "tiredness", "loss of taste", "difficulty breathing"]
        }
        
    def ask_questions(self):
        print("Welcome to the Medical Expert System!")
        print("Please answer with 'yes' or 'no' for the following symptoms:\n")
        
        all_symptoms = set()
        for sym_list in self.diseases.values():
            for sym in sym_list:
                all_symptoms.add(sym)
                
        for symptom in sorted(all_symptoms):
            ans = input(f"Do you have {symptom}? (yes/no): ").strip().lower()
            if ans in ['yes', 'y']:
                self.symptoms.append(symptom)
                
    def diagnose(self):
        print("\n--- Diagnosis Results ---")
        if not self.symptoms:
            print("You haven't reported any symptoms. You seem to be healthy!")
            return
            
        max_match = 0
        probable_disease = "Unknown"
        
        for disease, symptoms_list in self.diseases.items():
            matches = sum(1 for sym in self.symptoms if sym in symptoms_list)
            if matches > max_match:
                max_match = matches
                probable_disease = disease
                
        # Calculate certainty percentage based on matching symptoms
        total_disease_symptoms = len(self.diseases.get(probable_disease, []))
        if max_match > 0:
            percentage = (max_match / total_disease_symptoms) * 100
            print(f"Based on your symptoms, there is a {percentage:.2f}% chance you might have {probable_disease}.")
            print("Disclaimer: This is just a simple expert system. Please consult a real doctor for medical advice.")
        else:
            print("Could not diagnose any disease based on your symptoms.")

if __name__ == "__main__":
    system = MedicalExpertSystem()
    system.ask_questions()
    system.diagnose()
