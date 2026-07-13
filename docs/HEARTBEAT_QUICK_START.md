# System Heartbeat Metric - Quick Start Guide

## What Is It?

A Prometheus metric that reports whether the chaoslab service is running and available.

- **Metric Name:** `system_heartbeat`
- **Type:** Gauge
- **Values:** 1 (available) or 0 (unavailable)
- **Label:** `service="chaoslab"`

## How to Use

### View the Metric

```bash
# Get all metrics including heartbeat
curl http://localhost:3000/metrics | grep system_heartbeat

# Output:
# HELP system_heartbeat System heartbeat metric indicating baseline availability state (1=available, 0=unavailable)
# TYPE system_heartbeat gauge
system_heartbeat{service="chaoslab"} 1
```

### Prometheus Queries

**Is the service available?**

```promql
system_heartbeat{service="chaoslab"} == 1
```

**Is the service down?**

```promql
system_heartbeat{service="chaoslab"} == 0
```

**Service availability percentage (5-minute window):**

```promql
avg_over_time(system_heartbeat{service="chaoslab"}[5m]) * 100
```

### Grafana Dashboard

Add a new panel with this query to show service status:

```promql
system_heartbeat{service="chaoslab"}
```

Configure the panel:

- **Visualization:** Stat or Gauge
- **Thresholds:** 0 (red), 1 (green)
- **Unit:** None

## Configuration

Set the heartbeat update interval (in milliseconds):

```bash
export HEARTBEAT_INTERVAL_MS=60000  # Update every 60 seconds
npm start
```

Default: 30 seconds

## How It Works

1. **Service Starts** → Heartbeat set to 1 (available)
2. **Every 30 seconds** → Heartbeat updated to 1
3. **Service Stops** → Heartbeat set to 0 (unavailable)
4. **Prometheus Scrapes** → Metric exposed at `/metrics`

## Alerting Examples

### Alert: Service Down

```yaml
groups:
  - name: chaoslab
    rules:
      - alert: ChaoslabServiceDown
        expr: system_heartbeat{service="chaoslab"} == 0
        for: 1m
        annotations:
          summary: "Chaoslab service is down"
          description: "The chaoslab service has been unavailable for 1 minute"
```

### Alert: Heartbeat Missing

```yaml
- alert: ChaoslabHeartbeatMissing
  expr: absent(system_heartbeat{service="chaoslab"})
  for: 2m
  annotations:
    summary: "Chaoslab heartbeat is missing"
    description: "No heartbeat metric received for 2 minutes"
```

## Testing

```bash
# Run heartbeat tests
npm test -- tests/utils/heartbeat.test.ts
npm test -- tests/metrics.heartbeat.test.ts
```

## Troubleshooting

| Issue              | Solution                                                          |
| ------------------ | ----------------------------------------------------------------- |
| Metric not showing | Check if service is running and `/metrics` endpoint is accessible |
| Metric stuck at 0  | Service may be shutting down; check logs                          |
| Metric stuck at 1  | Normal; heartbeat updates every 30 seconds                        |
| High CPU usage     | Increase `HEARTBEAT_INTERVAL_MS` to reduce update frequency       |

## Related Files

- Implementation: `src/services/heartbeatService.ts`
- Metric Definition: `src/utils/metrics.ts`
- Tests: `tests/utils/heartbeat.test.ts`, `tests/metrics.heartbeat.test.ts`
- Full Documentation: `HEARTBEAT_METRIC_IMPLEMENTATION.md`

## See Also

- [Prometheus Documentation](https://prometheus.io/docs/)
- [prom-client Library](https://github.com/siimon/prom-client)
- [GitHub Issue #1022](https://github.com/chaoslab/chaoslab-api/issues/1022)
