from fastapi import HTTPException


def require_role(user, role):

    roles = (
        user
        .get(
            "realm_access",
            {}
        )
        .get(
            "roles",
            []
        )
    )

    if role not in roles:

        raise HTTPException(
            status_code=403,
            detail="Access Denied"
        )

    return True
