from pyspark.sql import SparkSession
from pyspark.ml.classification import LogisticRegression
from pyspark.ml.feature import VectorAssembler

# Initialize Spark Session (In-memory data processing)
spark = SparkSession.builder \
    .appName("Digital Marketing Analytics and ML") \
    .getOrCreate()

# Load Data
df = spark.read.csv("marketing_data.csv", header=True, inferSchema=True)

print("--- Data Schema ---")
df.printSchema()

# Spark Processing: Filter campaigns with high impressions
print("--- High Impression Ads (> 500) ---")
df.filter(df.impressions > 500).show()

# Spark MLlib: Predict 'is_click' based on 'impressions' and 'spend'
print("--- MLlib Logistic Regression Prediction ---")
# Prepare features
assembler = VectorAssembler(inputCols=["impressions", "spend"], outputCol="features")
ml_data = assembler.transform(df)

# Train simple Logistic Regression Model
lr = LogisticRegression(featuresCol="features", labelCol="is_click")
model = lr.fit(ml_data)

# Make Predictions
predictions = model.transform(ml_data)
predictions.select("ad_id", "impressions", "spend", "prediction").show()

spark.stop()
