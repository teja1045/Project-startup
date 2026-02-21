#!/usr/bin/env python3
"""
Admin Setup Script
Run this script to set up your admin password for the first time.
"""

import os
import secrets
import string
from pathlib import Path

def generate_strong_password(length=16):
    """Generate a strong random password."""
    alphabet = string.ascii_letters + string.digits + string.punctuation
    password = ''.join(secrets.choice(alphabet) for i in range(length))
    return password

def generate_jwt_secret(length=32):
    """Generate a secure JWT secret."""
    return secrets.token_urlsafe(length)

def setup_admin_password():
    """Setup admin password and JWT secret."""
    print("=" * 60)
    print("DevServices Admin Setup")
    print("=" * 60)
    print()
    
    backend_env = Path('/app/backend/.env')
    
    if not backend_env.exists():
        print("❌ Error: Backend .env file not found!")
        return
    
    print("Choose an option:")
    print("1. Set your own password")
    print("2. Generate a secure random password")
    print()
    
    choice = input("Enter choice (1 or 2): ").strip()
    
    if choice == "1":
        while True:
            password = input("Enter new admin password (min 8 characters): ").strip()
            if len(password) < 8:
                print("❌ Password must be at least 8 characters long!")
                continue
            
            confirm = input("Confirm password: ").strip()
            if password != confirm:
                print("❌ Passwords don't match! Try again.")
                continue
            
            break
    elif choice == "2":
        password = generate_strong_password()
        print(f"\n✅ Generated password: {password}")
        print("⚠️  IMPORTANT: Save this password securely!")
    else:
        print("❌ Invalid choice!")
        return
    
    # Generate JWT secret if not present
    jwt_secret = generate_jwt_secret()
    
    # Read current env file
    with open(backend_env, 'r') as f:
        lines = f.readlines()
    
    # Update env file
    updated = False
    jwt_updated = False
    new_lines = []
    
    for line in lines:
        if line.startswith('ADMIN_PASSWORD='):
            new_lines.append(f'ADMIN_PASSWORD="{password}"\n')
            updated = True
        elif line.startswith('JWT_SECRET='):
            new_lines.append(f'JWT_SECRET="{jwt_secret}"\n')
            jwt_updated = True
        else:
            new_lines.append(line)
    
    # Add if not present
    if not updated:
        new_lines.append(f'ADMIN_PASSWORD="{password}"\n')
    if not jwt_updated:
        new_lines.append(f'JWT_SECRET="{jwt_secret}"\n')
    
    # Write back
    with open(backend_env, 'w') as f:
        f.writelines(new_lines)
    
    print()
    print("=" * 60)
    print("✅ Admin password configured successfully!")
    print("=" * 60)
    print()
    print("📋 Setup Details:")
    print(f"   Admin Password: {password}")
    print(f"   Admin URL: https://build-serve-test.preview.emergentagent.com/admin/login")
    print()
    print("🔐 Security Tips:")
    print("   • Save your password in a secure password manager")
    print("   • Change password regularly from admin dashboard")
    print("   • Never share your admin credentials")
    print()
    print("🚀 Next Steps:")
    print("   1. Restart backend: sudo supervisorctl restart backend")
    print("   2. Access admin at: /admin/login")
    print("   3. Login with your password")
    print()

if __name__ == "__main__":
    try:
        setup_admin_password()
    except KeyboardInterrupt:
        print("\n\n❌ Setup cancelled.")
    except Exception as e:
        print(f"\n❌ Error: {e}")
