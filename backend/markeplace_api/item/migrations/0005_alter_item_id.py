# Generated by Django 5.0.6 on 2024-06-02 18:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('item', '0004_itemimage'),
    ]

    operations = [
        migrations.AlterField(
            model_name='item',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]