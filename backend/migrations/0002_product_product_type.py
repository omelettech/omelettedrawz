# Generated by Django 5.0.6 on 2024-09-15 01:15

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='product_type',
            field=models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, to='backend.producttype'),
            preserve_default=False,
        ),
    ]