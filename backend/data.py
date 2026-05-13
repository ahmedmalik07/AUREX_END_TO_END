from models import DashboardData, Metric, User, Activity, ChartData

DEMO_DASHBOARD = DashboardData(
    metrics=[
        Metric(label="Total Revenue", value="$124,592", change="+12.5%", trend="up"),
        Metric(label="Active Users", value="8,429", change="+5.2%", trend="up"),
        Metric(label="New Signups", value="1,203", change="-2.1%", trend="down"),
        Metric(label="Churn Rate", value="2.4%", change="-0.8%", trend="up"),
    ],
    recentUsers=[
        User(id=1, name="Alice Johnson", email="alice@example.com", role="Admin", status="Active", lastActive="2 min ago"),
        User(id=2, name="Bob Smith", email="bob@example.com", role="Editor", status="Active", lastActive="15 min ago"),
        User(id=3, name="Charlie Brown", email="charlie@example.com", role="Viewer", status="Inactive", lastActive="3 hours ago"),
        User(id=4, name="Diana Prince", email="diana@example.com", role="Editor", status="Active", lastActive="1 hour ago"),
        User(id=5, name="Evan Wright", email="evan@example.com", role="Viewer", status="Active", lastActive="30 min ago"),
    ],
    activities=[
        Activity(id=1, user="Alice Johnson", action="created", target="New Project Alpha", time="5 min ago"),
        Activity(id=2, user="Bob Smith", action="updated", target="Billing Settings", time="12 min ago"),
        Activity(id=3, user="Diana Prince", action="deleted", target="Old Campaign", time="1 hour ago"),
        Activity(id=4, user="Evan Wright", action="joined", target="Team Beta", time="2 hours ago"),
        Activity(id=5, user="Alice Johnson", action="published", target="Q4 Report", time="3 hours ago"),
    ],
    revenueChart=ChartData(
        labels=["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets=[
            {
                "label": "Revenue 2024",
                "data": [8200, 9500, 11000, 10500, 12500, 14000, 13500, 15000, 16500, 16000, 18500, 20000],
                "borderColor": "#6366f1",
                "backgroundColor": "rgba(99, 102, 241, 0.1)",
            },
            {
                "label": "Revenue 2023",
                "data": [7000, 7800, 8500, 9000, 9500, 10200, 11000, 11500, 12000, 12800, 13500, 14200],
                "borderColor": "#94a3b8",
                "backgroundColor": "rgba(148, 163, 184, 0.1)",
            },
        ],
    ),
    userGrowthChart=ChartData(
        labels=["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets=[
            {
                "label": "Users",
                "data": [1200, 1500, 2100, 2800, 3500, 4200, 4800, 5500, 6200, 6800, 7500, 8429],
                "borderColor": "#10b981",
                "backgroundColor": "rgba(16, 185, 129, 0.1)",
            }
        ],
    ),
)
