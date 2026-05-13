from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime


class User(BaseModel):
    id: int
    name: str
    email: str
    role: str
    status: str
    avatar: Optional[str] = None
    lastActive: str


class Metric(BaseModel):
    label: str
    value: str
    change: str
    trend: str  # 'up' or 'down'


class Activity(BaseModel):
    id: int
    user: str
    action: str
    target: str
    time: str


class ChartData(BaseModel):
    labels: List[str]
    datasets: List[dict]


class DashboardData(BaseModel):
    metrics: List[Metric]
    recentUsers: List[User]
    activities: List[Activity]
    revenueChart: ChartData
    userGrowthChart: ChartData
