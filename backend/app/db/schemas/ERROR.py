import json

class ROUTE_ERROR():
    def __init__(
        self,
        message = None
    ):
        self.message = message

    @property
    def as_json(self):
        return {
            "message": self.message,
        }