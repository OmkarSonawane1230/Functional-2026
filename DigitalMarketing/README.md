# Case Study: Digital Marketing Analytics Platform using Hadoop Ecosystem

## 1. Objective
A Digital Marketing agency wants to analyze their ad campaigns to understand customer engagement, total operational costs, predict click-through probabilities, and provide fast text-search for serving ad keywords.

## 2. Hadoop Ecosystem Components Used
*   **HDFS & YARN:** Stores the massive logs of impressions/clicks and schedules the processing resources.
*   **MapReduce:** Used for reliable, distributed counting of ad "keywords" to see the most served terms.
*   **Hive (Query based):** Summarizes spends and clicks per campaign using SQL-like syntax.
*   **Spark:** Performs fast, in-memory filtering for real-time reporting of high-impression ads.
*   **Spark MLlib:** Trains a machine learning model to predict whether an ad will be clicked based on the assigned budget/spend and historical impressions.
*   **HBase (NoSQL):** Stores real-time ad performance counters (clicks) that can be instantly incremented and read.
*   **Solr/Lucene:** Indexes ad keywords and details to allow advertisers to do sub-millisecond searches through active campaigns.

---

## 3. Installation & Setup Instructions

**(Assuming Hadoop, Spark, and Hive are already installed on your single-node cluster / VM)**

If missing, you will need to start your services. Typical paths on a Hadoop setup:

```bash
# 1. Start HDFS & YARN
start-dfs.sh
start-yarn.sh

# 2. Check if running
jps 
# Should show NameNode, DataNode, ResourceManager, NodeManager
```

---

## 4. Execution Instructions

### A. MapReduce (Keyword Counting)
```bash
cd DigitalMarketing
# Compile Java
hadoop com.sun.tools.javac.Main KeywordCount.java
jar cf wc.jar KeywordCount*.class

# Copy input to HDFS
hdfs dfs -mkdir -p /input_marketing
hdfs dfs -put marketing_data.csv /input_marketing/

# Run Job
hadoop jar wc.jar KeywordCount /input_marketing /output_marketing

# View output
hdfs dfs -cat /output_marketing/part-r-00000
```

### B. Hive Script (Campaign Spend & Clicks)
```bash
# Execute the Hive script
hive -f campaign_analysis.hql
```

### C. Spark & Spark MLlib (In-Memory Processing & ML prediction)
```bash
# Run the PySpark script 
spark-submit spark_analysis_and_ml.py
```

### D. HBase Commands (Run inside `hbase shell`)
```bash
# Enter HBase shell
hbase shell

# Commands to execute in shell:
create 'marketing_campaigns', 'stats'
put 'marketing_campaigns', 'C1_A1', 'stats:clicks', '150'
put 'marketing_campaigns', 'C2_A3', 'stats:spend', '100.0'
get 'marketing_campaigns', 'C1_A1'
scan 'marketing_campaigns'
```

### E. Solr / Lucene Commands (Indexing)
```bash
# Assuming Solr is running locally
# Create a text core for indexing keywords
bin/solr create -c marketing_core

# Index our CSV Data
curl 'http://localhost:8983/solr/marketing_core/update/csv?commit=true' \
    --data-binary @marketing_data.csv \
    -H 'Content-type:application/csv'

# Query test (Search for keyword "shoes")
curl http://localhost:8983/solr/marketing_core/query?q=keyword:shoes
```
