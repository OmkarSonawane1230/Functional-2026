import org.apache.spark.sql.SparkSession
import org.apache.spark.sql.functions._

object SimpleSparkApp {
  def main(args: Array[String]): Unit = {
    // Initialize SparkSession
    val spark = SparkSession.builder()
      .appName("Live Spark Application")
      .master("local[*]") // Run locally using all logical cores
      .getOrCreate()

    import spark.implicits._

    spark.sparkContext.setLogLevel("ERROR")

    println("==========================================================")
    println("Generating Multiplication Table of 8 using Spark DataFrame")
    println("==========================================================")

    // 1. Generate numbers from 1 to 10
    val numbers = (1 to 10).toSeq

    // 2. Convert to DataFrame
    val df = numbers.toDF("Multiplier")

    // 3. Add column for the Base number (8) and Result (8 * Multiplier)
    val multiplicationTable = df
      .withColumn("Base", lit(8)) // lit() creates a constant column value
      .withColumn("Result", $"Base" * $"Multiplier")
      .select($"Base", lit("x").alias("X"), $"Multiplier", lit("=").alias("Equals"), $"Result") // Formatting for display

    // 4. Show the output in the console
    multiplicationTable.show(false)

    println("==========================================================")
    println(">>> Spark Web UI at http://localhost:4040")
    println(">>> Press ENTER to stop the application")
    println("==========================================================")

    // Wait for you to press ENTER to shut down
    scala.io.StdIn.readLine()

    // Stop the Spark context
    spark.stop()
  }
}
