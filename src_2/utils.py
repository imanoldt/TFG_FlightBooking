from datetime import datetime
from calendar import monthrange

class Utils:
    def calcular_progreso_mes():
        
        today = datetime.now()
        month_number = today.month
        datetime_object = datetime.strptime(str(month_number), "%m")
        days = monthrange(today.year, today.month)
        progress = today.day/days[1]
        
        return progress
    
    def calcular_progreso_semana():
        today = datetime.now()
        week_number = today.weekday()
        progress = week_number/7
        
        return progress

    def calcular_progreso_dia():
        today = datetime.now()
        day_hour = today.hour
        progress = day_hour/24
        return progress
    
    