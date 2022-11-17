db.createCollection(
    "links",
    {
       timeseries: {
          timeField: "createdAt",
          granularity: "seconds"
       },
       expireAfterSeconds: 600
    }
)
