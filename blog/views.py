from django.shortcuts import render, redirect
from .models import Post, Comment, Categories, User
from django.contrib import messages
from django.contrib.auth import login, logout, authenticate, get_user_model
from django.contrib.auth.decorators import login_required

@login_required
def home(request):
    return render(request, 'home.html')


def login_user(request):
    if request.method == "POST":
        username = request.POST.get('username').strip('')
        password = request.POST.get('password')

        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)

    return render(request, 'account.html')

def register(request):
    if request.method == "POST":
        User = get_user_model()
        username = request.POST.get('username').strip('')
        email = request.POST.get('email').strip('')

        password = request.POST.get('password')
        confirm_password = request.POST.get('password_confirm')

        if password != confirm_password:
            messages.warning(request, "Passwords do not match")
        elif User.objects.filter(email__exact=email).exists():
            messages.warning(request, "Email exist")
        else:
            User = get_user_model()
            User.objects.create_user(
                username=username,
                email=email,
                password=confirm_password
            )
            
            login(request, User)

    return request(request, 'account.html')

def account(request):
    return render(request, 'account.html')
